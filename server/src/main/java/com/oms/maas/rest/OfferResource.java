package com.oms.maas.rest;

import com.google.gson.Gson;
import com.oms.maas.Generator;
import com.oms.maas.api.OfferApi;
import io.swagger.models.Swagger;
import io.swagger.models.parameters.QueryParameter;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

@RestController
public class OfferResource extends OfferApi {

    @Override
    public Response offerCheapGet() {
        File file = new File(getProjectRootPath()+"/server/src/main/resources/api.yaml");
        String content = readLineByLineJava8(file.getPath());

        Swagger swagger = new io.swagger.parser.SwaggerParser().parse(content);

        List<Map<String, String>> companyValues = new ArrayList<>();
        swagger.getPaths().forEach((k, v) -> {
            if(v.getPost() != null && k.startsWith("/company")){
                Map<String, String> defaulValueMap = new LinkedHashMap<>();
                v.getPost().getParameters().stream().forEach(e -> {
                    QueryParameter queryParameter = (QueryParameter) e;
                    if( queryParameter.getDefaultValue() != null)
                    defaulValueMap.put(queryParameter.getName(), queryParameter.getDefaultValue().toString());
                });
                companyValues.add(defaulValueMap);
            }
        });

        Map<String, String> cheapestOfferMap = getCheapestProviderMap( companyValues);
        String iotaStuff = getInformationFromBeyond("node iota/apiGetAccount.js --provider=" + cheapestOfferMap.get("provider").toLowerCase());
        cheapestOfferMap.put("address", iotaStuff.replace("\n", ""));

        Gson gson = new Gson();
        String json = gson.toJson(cheapestOfferMap);
        return Response.ok().entity(json).build();
    }

    private Map<String, String> getCheapestProviderMap(List<Map<String, String>> companyValues) {
        Map<String, String> cheapestProviderMap = new LinkedHashMap<>();
        companyValues.forEach(e -> {
            if(cheapestProviderMap.isEmpty() ){
                cheapestProviderMap.clear();
                cheapestProviderMap.putAll(e);
            }else{
                if(cheapestProviderMap.containsKey("price") && e.containsKey("price")){
                    try{
                        int cheapest = Integer.valueOf(cheapestProviderMap.get("price"));
                        int newPrice = Integer.valueOf(e.get("price"));
                        if(cheapest > newPrice){
                            cheapestProviderMap.clear();
                            cheapestProviderMap.putAll(e);
                        }
                    }catch(Exception ex){
                        //
                    }
                }
            }
        });

        return cheapestProviderMap;
    }


    @Override
    public Response offerFastGet() {
        File file = new File(getProjectRootPath()+"/server/src/main/resources/api.yaml");
        String content = readLineByLineJava8(file.getPath());

        Swagger swagger = new io.swagger.parser.SwaggerParser().parse(content);

        List<Map<String, String>> companyValues = new ArrayList<>();
        swagger.getPaths().forEach((k, v) -> {
            if(v.getPost() != null && k.startsWith("/company")){
                Map<String, String> defaulValueMap = new LinkedHashMap<>();
                v.getPost().getParameters().stream().forEach(e -> {
                    QueryParameter queryParameter = (QueryParameter) e;
                    if( queryParameter.getDefaultValue() != null)
                        defaulValueMap.put(queryParameter.getName(), queryParameter.getDefaultValue().toString());
                });
                companyValues.add(defaulValueMap);
            }
        });
        Map<String, String> fastestOfferMap = getFastestProviderMap( companyValues);
        String iotaStuff = getInformationFromBeyond("node iota/apiGetAccount.js --provider=" + fastestOfferMap.get("provider").toLowerCase());
        fastestOfferMap.put("address", iotaStuff.replace("\n", ""));

        Gson gson = new Gson();
        String json = gson.toJson(fastestOfferMap);
        return Response.ok().entity(json).build();
    }

    private Map<String, String> getFastestProviderMap(List<Map<String, String>> companyValues) {
        Map<String, String> fastestProviderMap = new LinkedHashMap<>();
        companyValues.forEach(e -> {
            if(fastestProviderMap.isEmpty() ){
                fastestProviderMap.clear();
                fastestProviderMap.putAll(e);
            }else{
                if(fastestProviderMap.containsKey("speed") && e.containsKey("speed")){
                    try{
                        int fastest = Integer.valueOf(fastestProviderMap.get("speed"));
                        int newPrice = Integer.valueOf(e.get("speed"));
                        if(fastest < newPrice){
                            fastestProviderMap.clear();
                            fastestProviderMap.putAll(e);
                        }
                    }catch(Exception ex){
                        //
                    }
                }
            }
        });

        return fastestProviderMap;
    }
/*
    @Override
    public Response offerIdGet(String id) {
        String iotaStuff = getInformationFromBeyond("js stuff"); //TODO ad js command

        Response response = Response.ok().entity("{\n" +
                "  \"id\":\"1234\",\n" +
                "  \"productName\":\"DriveNow\",\n" +
                "  \"description\":\"Meet at the mainstation\",\n" +
                "  \"validFrom\": \"20180720\",\n" +
                "  \"validFrom\": \"20180729\",\n" +
                "  \"locationStart\":\"Munich\",\n" +
                "  \"locationEnd\":\"Berlin\",\n" +
                "  \"price\": \"100\",\n" +
                "  \"currency\":\"eur\",\n" +
                "  \"co2-emission\":\"5/10\",\n" +
                "  \"options\":\"...\",\n" +
                "  \"address\":\"" + iotaStuff + "\"\n" +
                "}").build();
        return response;
    }
*/

    private String getInformationFromBeyond(String function){
        Runtime runtime = Runtime.getRuntime();

        String s = "";
        try {
            //function = function.replace("\"", "\\\"").replace("\'", "\\'");
            Process process = runtime.exec(function);
            int resultCode = process.waitFor();

            if (resultCode == 0) {
                // all is good
            }

            s = IOUtils.toString(process.getInputStream());
            String error = IOUtils.toString(process.getErrorStream());
        } catch (Throwable cause) {
            // process cause
        }

        return s;
    }

    @Override
    public Response offerPostPost(String id, String productName, String provider, String description, String validFrom, String validTo, String locationStart, String locationEnd, String price, String currency, String co2emission, String speed, List<String> options) {

        Map<String, String> map = new HashMap<>();
        map.put("id", id);
        map.put("productName", productName);
        map.put("provider", provider);
        map.put("description", description);
        map.put("validFrom", validFrom);
        map.put("validTo", validTo);
        map.put("locationStart", locationStart);
        map.put("locationEnd", locationEnd);
        map.put("price", price);
        map.put("currency", currency);
        map.put("co2emission", co2emission);
        map.put("speed", speed);
        Gson gson = new Gson();
        String json = gson.toJson(map);

        String complete = "node iota/apiPublish.js --payload='" + json + "'";
        //complete.replace(" ", "\\ ");
        String done = getInformationFromBeyond(complete);

        Response response = Response.ok().entity(done).build();
        return response;
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

    private static String readLineByLineJava8(String filePath)
    {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines( Paths.get(filePath), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return contentBuilder.toString();
    }
}
