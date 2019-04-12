package com.bkx.b_sir;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.io.FileWriter;
import java.io.IOException;


// 继承这个SpringBootServletInitializer，可以打成war包
//@ServletComponentScan
@EnableTransactionManagement
@SpringBootApplication
@EnableJpaAuditing
public class BSirApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(BSirApplication.class, args);
    }

}
