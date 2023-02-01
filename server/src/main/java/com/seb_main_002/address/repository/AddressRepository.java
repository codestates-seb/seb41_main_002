package com.seb_main_002.address.repository;

import com.seb_main_002.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query(value = "SELECT * FROM address WHERE member_id = :memberId", nativeQuery = true)
    List<Address> findAddressesByMemberId(Long memberId);
}
