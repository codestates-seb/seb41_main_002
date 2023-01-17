package com.seb_main_002.security.redis;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtRefreshTokenRepository extends CrudRepository<JwtRefreshToken,String> {
}
