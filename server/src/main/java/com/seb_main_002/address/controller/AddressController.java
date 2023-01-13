package com.seb_main_002.address.controller;

import com.seb_main_002.address.dto.AddressPatchDto;
import com.seb_main_002.address.dto.AddressPostDto;
import com.seb_main_002.address.mapper.AddressMapper;
import com.seb_main_002.address.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {
    private final AddressMapper mapper;
    private final AddressService addressService;

    public AddressController(AddressMapper mapper, AddressService addressService) {
        this.mapper = mapper;
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity postAddress(@RequestBody AddressPostDto addressPostDto) {
        addressService.createAddress(mapper.addressPostDtoToAddress(addressPostDto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{addressId}")
    public ResponseEntity patchAddress(@RequestParam("addressId") Long addressId,
                                       @RequestBody AddressPatchDto addressPatchDto) {

        addressService.updateAddress(mapper.addressPatchDtoToAddress(addressPatchDto).setAddressId(addressId));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
