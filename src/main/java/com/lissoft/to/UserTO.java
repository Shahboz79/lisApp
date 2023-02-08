package com.lissoft.to;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserTO implements Serializable {
    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
    private String userName;
    private String password;
    private String oldPassword;
    private String role;
    private SimpleTO clinic;
    private Long memberId;
    private String language;

    public UserTO(Long id, String lastName, String firstName, String role) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.role = role;
    }

    public UserTO(Long id, String lastName, String firstName, String userName, String password) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.userName = userName;
        this.password = password;
    }
}
