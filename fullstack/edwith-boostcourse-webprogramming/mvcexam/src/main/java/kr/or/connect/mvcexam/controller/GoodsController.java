package kr.or.connect.mvcexam.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
public class GoodsController {
	@GetMapping("/goods/{id}")
	public String getGodosById(@PathVariable(name="id") int id,
			@RequestHeader(value="User-Agent", defaultValue="myBrowser") String userAgent,
			HttpServletRequest request,
			ModelMap model) {
		String path = request.getServletPath();
		
		System.out.println("id : " + id);
		System.out.println("user_agent : " + userAgent);
		System.out.println("path : " + path);
		
		model.addAttribute("id", id);
		model.addAttribute("userAgent", userAgent);
		model.addAttribute("path", path);
		return "goodsById";
	}
}
