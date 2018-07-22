package com.oms.maas;

import io.swagger.models.Swagger;
import io.swagger.util.Json;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class Generator {

    public static void main(final String[] args) {

        File file = new File(getProjectRootPath() + "/server/src/main/resources/api.yaml");
        String content = readLineByLineJava8(file.getPath());

        Swagger swagger = new io.swagger.parser.SwaggerParser().parse(content);
        String jsonOutput = Json.pretty(swagger);

        BufferedWriter writer = null;
        File out = new File(getProjectRootPath() + "/server/src/main/resources/static/swagger.json");
        try {
            writer = Files.newBufferedWriter(out.toPath());
            StringBuilder sb = new StringBuilder(jsonOutput);
            writer.write(sb.toString());
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getProjectRootPath() {

        URL resourceUrl = Generator.class.getResource("");
        String resourceString = resourceUrl.getPath();
        String currentProject = "";
        if (resourceString.contains("/generator")) currentProject = "/generator";
        else if (resourceString.contains("/server")) currentProject = "/server";
        else if (resourceString.contains("/iota")) currentProject = "/iota";

        return (resourceString.substring(resourceString.indexOf('/'), resourceString.indexOf(currentProject))).replace("%20", " ");
    }

    private static String readLineByLineJava8(String filePath) {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contentBuilder.toString();
    }
}
