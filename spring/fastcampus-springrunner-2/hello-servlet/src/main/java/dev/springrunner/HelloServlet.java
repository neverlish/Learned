package dev.springrunner;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(urlPatterns = {"/hello"})
public class HelloServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestName = request.getParameter("name");
        String servletName = getServletConfig().getServletName();
        StringBuilder html = new StringBuilder();
        html.append("<html>");
        html.append("  <head>");
        html.append("    <title>초 간단 자바 서블릿 개발하기</title>");
        html.append("  </head>");
        html.append("  <body>");
        html.append("    <h1>" + requestName + "님 안녕하세요.</h1>");
        html.append("    <h1>저는 " + servletName + "입니다.</h1>");
        html.append("  </body>");
        html.append("</html>");

        response.setStatus(200);
        response.setContentType("text/html; charset=UTF-8");

        response.setStatus(200);
        response.setContentType("text/html; charset=UTF-8");

        response.getWriter().write(html.toString());
    }
}
