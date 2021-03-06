package com.bkx.b_sir.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @ClassName: ConfigSwagger2
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/21 14:39
 * @Description: TODO
 **/
@Configuration
@EnableSwagger2
public class ConfigSwagger2 {

    @Autowired
    private SwaggerConfigProperties scp;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.web"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {

        return new ApiInfoBuilder()
                .title(scp.getTitle())
                .description(scp.getDescription())
                .version("1.0")
                .build();
    }
}
