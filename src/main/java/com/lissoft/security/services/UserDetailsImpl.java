package com.lissoft.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lissoft.entity.User;
import com.lissoft.to.SimpleTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

	private String lastName;

	private String firstName;

	private String username;

	@JsonIgnore
	private String password;

	private SimpleTO clinic;

	private String language;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String lastName, String firstName, String username, String password, SimpleTO clinic,
			String language, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.lastName = lastName;
		this.firstName = firstName;
		this.username = username;
		this.password = password;
		this.clinic = clinic;
		this.language = language;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(User user) {
		AtomicBoolean isAdmin = new AtomicBoolean(false);
		List<GrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(r-> {
			if ("ROLE_ADMIN".equals(r.getName().name())) {
				isAdmin.set(true);
			}
			authorities.add(new SimpleGrantedAuthority(r.getName().name()));
		});

		return new UserDetailsImpl(
				user.getId(), 
				user.getMember() != null ? user.getMember().getLastName() : "",
				user.getMember() != null ? user.getMember().getFirstName() : "",
				user.getUserName(),
				user.getPassword(),
				(isAdmin.get() ? null : (user.getMember() != null && user.getMember().getOrganization() != null ?
						user.getMember().getOrganization().toSimpleTO() : null)), user.getLanguage(),
				authorities);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
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
