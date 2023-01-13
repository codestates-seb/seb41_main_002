package com.seb_main_002.address.service;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService (AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void createAddress(Address address) {
        verifyDuplicateAddress(address);

        if(address.getIsPrimary()) {
            changePrimaryAddress(address.getMember().getMemberId());
        }

        addressRepository.save(address);
    }

    public void updateAddress(Address address){
        Address verifiedAddress = verifyExistAddress(address.getAddressId());

        if(address.getIsPrimary()) {
            changePrimaryAddress(verifiedAddress.getMember().getMemberId());
        }

        Optional.ofNullable(address.getAddressTitle()).ifPresent(addressTitle -> verifiedAddress.setAddressTitle(addressTitle));
        Optional.ofNullable(address.getAddress()).ifPresent(addressContent -> verifiedAddress.setAddress(addressContent));
        Optional.ofNullable(address.getIsPrimary()).ifPresent(isPrimary -> verifiedAddress.setIsPrimary(isPrimary));
        Optional.ofNullable(address.getZipcode()).ifPresent(zipcode -> verifiedAddress.setZipcode(zipcode));

        addressRepository.save(verifiedAddress);
    }

    private void changePrimaryAddress(Long memberId) {
        addressRepository.findAll().forEach(addressInfo -> {
            if(addressInfo.getMember().getMemberId().equals(memberId)) {
                addressInfo.setIsPrimary(false);
            }
        });
    }

    private Address verifyExistAddress(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
    }

    private void verifyDuplicateAddress(Address address) {
        Long memberId = address.getMember().getMemberId();

        addressRepository.findAll().forEach(addressInfo -> {
            if(addressInfo.getMember().getMemberId().equals(memberId)) {
                boolean addressCheck = addressInfo.getAddress().equals(address.getAddress());
                boolean zipcodeCheck = addressInfo.getZipcode().equals(address.getZipcode());

                if(addressCheck && zipcodeCheck) throw new BusinessLogicException(ExceptionCode.ADDRESS_EXISTS);
            }
        });
    }

}
