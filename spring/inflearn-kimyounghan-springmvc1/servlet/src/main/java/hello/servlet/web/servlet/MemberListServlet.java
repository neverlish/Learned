package hello.servlet.web.servlet;

import hello.servlet.domain.member.Member;
import hello.servlet.domain.member.MemberRepository;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "memberListServlet", urlPatterns = "/servlet/members")
public class MemberListServlet extends HttpServlet {
    private MemberRepository memberRepository = MemberRepository.getInstance();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Member> members = memberRepository.findAll();

        resp.setContentType("text/html");
        resp.setCharacterEncoding("utf-8");

        PrintWriter w = resp.getWriter();

        w.write("\n" +
                "<html>\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Title</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <a href=\"/index.html\">메인</a>\n" +
                "    <table>\n" +
                "        <thead>\n" +
                "            <th>id</th>\n" +
                "            <th>username</th>\n" +
                "            <th>age</th>\n" +
                "        </thead>\n" +
                "    </table>\n" +
                "    <tbody>");
        for (Member member: members) {
            w.write("<tr>\n" +
                    "    <td>" + member.getId() + "</td>\n" +
                    "    <td>" + member.getUsername() + "</td>\n" +
                    "    <td>" + member.getAge() + "</td>\n" +
                    "</tr>");
        }
        w.write("    </tbody>\n" +
                "</body>\n" +
                "</html>");
    }
}

