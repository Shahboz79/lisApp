package com.lissoft.controller;

import com.lissoft.security.jwt.JwtUtils;
import com.lissoft.security.services.UserDetailsImpl;
import com.lissoft.services.UserService;
import com.lissoft.to.AuthTO;
import com.lissoft.to.http.JwtResponse;
import com.lissoft.to.UserTO;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController {
    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    public UserController(AuthenticationManager authenticationManager, UserService userService,
                          PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @ApiOperation(value = "Логин пользователя в систему", notes = "Логин пользователя в систему с помощью логин и парол")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(), userDetails.getLastName(), userDetails.getFirstName(),
                userDetails.getUsername(), userDetails.getLanguage(), userDetails.getClinic(), roles));
    }

    /*@GetMapping("/profile/get")
    public ResponseEntity<?> getUserProfile() {
        Long userId = getUserId();
        if (userId == null || userId <= 0L) {
            return errorResponse("Error: User ID not entered!");
        }

        return userService.getUserProfile(userId);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileTO profileTO) {
        if (profileTO.getId() == null || profileTO.getId() <= 0L) {
            return errorResponse("Error: User ID not entered!");
        }

        userService.updateUserProfile(profileTO);

        return successResponse("User registered successfully!");
    }*/

    /*@PostMapping("/profile/uploadImage")
    public ResponseEntity<?> uploadUserProfileImage(@RequestParam(name = "profileId") Long profileId,
                                                    @RequestParam(name = "image") MultipartFile imageFile) {
        if (profileId == null || profileId <= 0L) {
            return errorResponse("Error: User ID not entered!");
        }

        if (imageFile == null) {
            return errorResponse("Error: Please select user profile image");
        }

        return userService.updateUserProfileImage(profileId, imageFile);
    }
*/
    @PostMapping("/password/update")
    public ResponseEntity<?> updatePassword(@RequestBody UserTO to) {
        Long userId = getUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        to.setId(userId);
        if (!StringUtils.hasLength(to.getPassword())) {
            return errorResponse("Parolni kiriting!");
        } else if (to.getPassword().length() < 7) {
            return errorResponse("Error: Length of pin code need 4 symbols");
        }

        return userService.changePassword(to);
    }
}
