package com.seb_main_002.address.service;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService (AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void createAddress(Address address) {
        verifyDuplicateAddress(address, "post");

        if(address.getIsPrimary()) {
            changePrimaryAddress(address.getMember().getMemberId());
        }

        addressRepository.save(address);
    }

    public void updateAddress(Address address) {
        Address verifiedAddress = verifyExistAddress(address.getAddressId());

        address.setMember(new Member());
        address.getMember().setMemberId(verifiedAddress.getMember().getMemberId());
        verifyDuplicateAddress(address, "patch");

        if(address.getIsPrimary()) {
            changePrimaryAddress(verifiedAddress.getMember().getMemberId());
        }

        Optional.ofNullable(address.getIsPrimary()).ifPresent(isPrimary -> verifiedAddress.setIsPrimary(isPrimary));
        Optional.ofNullable(address.getAddressTitle()).ifPresent(addressTitle -> verifiedAddress.setAddressTitle(addressTitle));
        Optional.ofNullable(address.getZipcode()).ifPresent(zipcode -> verifiedAddress.setZipcode(zipcode));
        Optional.ofNullable(address.getAddress()).ifPresent(addressContent -> verifiedAddress.setAddress(addressContent));

        addressRepository.save(verifiedAddress);
    }

    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }

    private void changePrimaryAddress(Long memberId) {
        addressRepository.findAddressesByMemberId(memberId).forEach(memberAddress -> {
            memberAddress.setIsPrimary(false);
        });
    }

    private Address verifyExistAddress(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADDRESS_NOT_FOUND));
    }

    private void verifyDuplicateAddress(Address address, String requestMethodType) {
        boolean isNewRegister = requestMethodType.equals("post");

        Long memberId = address.getMember().getMemberId();
        List<Address> memberAddressList = addressRepository.findAddressesByMemberId(memberId);

        memberAddressList.forEach(memberAddress -> {
            if(!isNewRegister && address.getAddressId().equals(memberAddress.getAddressId())) {
                // 신규 등록이 아닐 경우 수정하려는 주소의 자신(해당 addressId)에 해당하는 주소는 중복 검사를 실행하지 않음
            } else {
                boolean addressCheck = memberAddress.getAddress().equals(address.getAddress());
                boolean zipcodeCheck = memberAddress.getZipcode().equals(address.getZipcode());

                if (addressCheck && zipcodeCheck) throw new BusinessLogicException(ExceptionCode.ADDRESS_EXISTS);
            }
        });
    }


}
