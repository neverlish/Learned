package hello.hellospring.controller;

import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MemberController {
    private MemberService memberService;

    @Autowired
    public void setMemberController(MemberService memberService) {
        this.memberService = memberService;
    }

//    @Autowired
//    public MemberController(MemberService memberService) {
//        this.memberService = memberService;
//    }
}
