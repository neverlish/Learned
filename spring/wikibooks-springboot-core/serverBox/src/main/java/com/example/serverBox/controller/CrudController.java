package com.example.serverBox.controller;

import com.example.serverBox.dto.MemberDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/crud-api")
public class CrudController {
    @GetMapping
    public String getName() {
        return "Flature";
    }

    @GetMapping(value = "/{variable}")
    public String getVariable(@PathVariable String variable) {
        return variable;
    }

    @GetMapping("/param")
    public String getNameWithParam(@RequestParam String name) {
        return "Hello. " + name + "!";
    }

    @PostMapping
    public ResponseEntity<MemberDto> getMember(
        @RequestBody MemberDto request,
        @RequestParam String name,
        @RequestParam String email,
        @RequestParam String organization
    ) {
        System.out.println(request.getName());
        System.out.println(request.getEmail());
        System.out.println(request.getOrganization());

        MemberDto memberDto = new MemberDto();
        memberDto.setName(name);
        memberDto.setEmail(email);
        memberDto.setOrganization(organization);

        return ResponseEntity.status(HttpStatus.OK).body(memberDto);
    }

    @PostMapping(value = "/add-header")
    public ResponseEntity<MemberDto> addHeader(@RequestHeader("my-header") String header, @RequestBody MemberDto memberDto) {
        System.out.println(header);
        return ResponseEntity.status(HttpStatus.OK).body(memberDto);
    }
}
