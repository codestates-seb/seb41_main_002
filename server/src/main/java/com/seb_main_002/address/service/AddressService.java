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
        verifyDuplicateAddress(address.getZipcode());

        if(address.getIsPrimary()) {
            addressRepository.findAll().forEach(existsAddress -> {
                existsAddress.setIsPrimary(false);
            });
        }

        addressRepository.save(address);
    }

    public void updateAddress(Address address){
        Address verifiedAddress = verifyExistAddress(address.getAddressId());

    }

    private Address verifyExistAddress(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
    }

    private void verifyDuplicateAddress(String zipcode) {
        addressRepository.findAll().forEach(address -> {
            if(address.getZipcode().equals(zipcode)) throw new BusinessLogicException(ExceptionCode.ADDRESS_EXISTS);
        });
    }
}
