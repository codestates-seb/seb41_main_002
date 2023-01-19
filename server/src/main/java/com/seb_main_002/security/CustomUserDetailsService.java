package com.seb_main_002.security;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.security.util.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

// 데이터베이스에서 조회한 User의 인증 정보를 기반으로 인증을 처리
@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByAccountId(username);
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(member.getEmail());

        return new MemberDetails(member);
    }

        public final class MemberDetails extends Member implements UserDetails {

            MemberDetails(Member member) {
                setMemberId(member.getMemberId());
                setAccountId(member.getAccountId());
                setBirthdate(member.getBirthdate());
                setEmail(member.getEmail());
                setPhoneNumber(member.getPhoneNumber());
                setPassword(member.getPassword());
                setRoles(member.getRoles());
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return authorityUtils.createAuthorities(this.getRoles());
            }

            @Override
            public String getUsername() {
                return getUsername();
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        }
    }
