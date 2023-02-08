package com.lissoft.to.http;

import com.lissoft.to.SimpleTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
	private String token;
	private Long id;
	private String lastName;
	private String firstName;
	private String userName;
	private String language;
	private SimpleTO clinic;
	private List<String> roles;

}
