package com.example.springsduty.drinks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author nonpool
 * @version 1.0
 * @since 2020/3/17
 */
@Controller
public class IndexController {

    @RequestMapping("/index")
    public ModelAndView hello(){
        return new ModelAndView("index");
    }
}
