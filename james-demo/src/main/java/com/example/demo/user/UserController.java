package com.example.demo.user;

import com.example.demo.user.User;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "users/info", method = RequestMethod.GET)
    public String info(){
        return "The user application is up...";
    }

    @RequestMapping(path = "users/create", method = RequestMethod.POST)
    public List<String> createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @RequestMapping(path = "users/read", method = RequestMethod.GET)
    public List<User> readUsers(){
        return userService.readUsers();
    }

    @RequestMapping(path = "users/login", method = RequestMethod.POST)
    public List<User> login(@RequestBody User user){
        return userService.getUserByEmailAndPassword(user.getEmail(),user.getPassword());
    }

    @RequestMapping(path = "users/update", method = RequestMethod.PUT)
    public List<String> updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @RequestMapping(path = "users/delete", method = RequestMethod.DELETE)
    public List<String> deleteUser(@RequestBody User user){
        return userService.deleteUser(user);
    }
}
