package com.lissoft.to.http;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessageResponse {
	private String message;
	private Long id;

	public MessageResponse(String message) {
		this.message = message;
	}
}
