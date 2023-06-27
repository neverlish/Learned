package com.springboot.hello.controller;

import com.springboot.hello.dto.MemberDto;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/get-api")
public class GetController {

    private final Logger LOGGER = LoggerFactory.getLogger(GetController.class);

    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String getHello() {
        LOGGER.info("getHello 메서드가 호출되었습니다.");
        return "Hello World";
    }

    @GetMapping(value = "/name")
    public String getName() {
        LOGGER.info("getName 메서드가 호출되었습니다.");
        return "Flature";
    }

    @GetMapping(value = "/variable1/{variable}")
    public String getVariable1(@PathVariable String variable) {
        LOGGER.info("@PathVariable을 통해 들어온 값 : {}", variable);
        return variable;
    }

    @GetMapping(value = "/variable2/{variable}")
    public String getVariable2(@PathVariable("variable") String var) {
        return var;
    }

    @GetMapping(value = "/request1")
    public String getRequestParam1(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String organization
    ) {
        return name + " " + email + " " + organization;
    }

    @GetMapping(value = "/request2")
    public String getRequestParam2(@RequestParam Map<String, String> param) {
        StringBuilder sb = new StringBuilder();
        param.entrySet().forEach(map -> {
            sb.append(map.getKey() + " + " + map.getValue() + "\n");
        });
        return sb.toString();
    }

    @GetMapping(value = "/request3")
    public String getRequestParams3(MemberDto memberDto) {
        return memberDto.toString();
    }
}
