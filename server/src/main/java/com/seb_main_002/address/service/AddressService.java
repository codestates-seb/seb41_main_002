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
        verifyExistAddress(address.getZipcode());

        if(address.getIsPrimary()) {
            addressRepository.findAll().forEach(existsAddress -> {
                existsAddress.setIsPrimary(false);
            });
        }

        addressRepository.save(address);
    }

    private void verifyExistAddress(String zipcode) {
        addressRepository.findAll().forEach(address -> {
            if(address.getZipcode().equals(zipcode)) throw new BusinessLogicException(ExceptionCode.ADDRESS_EXISTS);
        });
    }
}
