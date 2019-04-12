package com.bkx.b_sir.thymeleaf;

import lombok.extern.slf4j.Slf4j;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.io.FileWriter;
import java.io.IOException;

/**
 * @ClassName: HelloThymeleaf
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/20 16:58
 * @Description: TODO
 **/
@Slf4j
public class HelloThymeleaf {

    public static void main(String[] args) throws IOException {

        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("templates/");//模板所在目录，相对于当前classloader的classpath。
        resolver.setSuffix(".html");//模板文件后缀
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(resolver);

        //构造上下文(Model)
        Context context = new Context();
        context.setVariable("name", "蔬菜列表");
        context.setVariable("array", new String[]{"土豆", "番茄", "白菜", "芹菜"});
        //渲染模板
        FileWriter write = new FileWriter("result.html");
        templateEngine.process("example", context, write);
    }
}
