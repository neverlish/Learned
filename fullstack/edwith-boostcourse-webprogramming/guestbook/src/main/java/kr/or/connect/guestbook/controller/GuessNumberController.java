package kr.or.connect.guestbook.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GuessNumberController {
	@GetMapping("/guess")
	public String guess(@RequestParam(name="number", required=false) Integer number,
						HttpSession session,
						ModelMap model) {
		
		String message = null;
		
		if (number == null) {
			session.setAttribute("count", 0);
			session.setAttribute("randomNumber", (int)(Math.random() * 100) + 1); // 1 ~ 100사이의 random값
			message = "내가 생각한 숫자를 맞춰보세요.";
		} else {
			int count = (Integer)session.getAttribute("count");
			int randomNumber = (Integer)session.getAttribute("randomNumber");
			
			if(number < randomNumber) {
				message = "입력한 값은 내가 생각하고 있는 숫자보다 작습니다.";
				session.setAttribute("count", ++count);
			}else if(number > randomNumber) {
				message = "입력한 값은 내가 생각하고 있는 숫자보다 니다.";
				session.setAttribute("count", ++count);
			}else {
				message = "OK " + ++count + " 번째 맞췄습니다. 내가 생각한 숫자는 " + number + " 입니다.";
				session.removeAttribute("count");
				session.removeAttribute("randomNumber");
			}
		}
		
		model.addAttribute("message", message);
		
		return "guess";
	}
}
