package com.seb_main_002.address.service;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService (AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void createAddress(Address address) {
        verifyDuplicateAddress(address);

        if(address.getIsPrimary()) {
            addressRepository.findAll().forEach(existsAddress -> {
                existsAddress.setIsPrimary(false);
            });
        }

        addressRepository.save(address);
    }

    private void changePrimaryAddress(Long memberId) {
            addressRepository.findAll().forEach(addressInfo -> {
                if(addressInfo.getMember().getMemberId().equals(memberId)) {
                    addressInfo.setIsPrimary(false);
                }
        });
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
