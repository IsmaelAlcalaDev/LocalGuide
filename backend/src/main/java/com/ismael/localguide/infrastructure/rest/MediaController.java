package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.UploadImageUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}, maxAge = 3600, allowCredentials = "true")
public class MediaController {

    @Autowired
    private UploadImageUseCase uploadImageUseCase;

    @PostMapping(value = "/v1/images/upload/{id}")
    public void uploadImage(@PathVariable("id") Long id, @RequestParam("file") MultipartFile file) throws IOException {
        //No se sube el fichero y no se actualiza el registro
        //Se sube el fichero pero actualizar el registro da error
        //HappyPath
        this.uploadImageUseCase.uploadImage(file.getInputStream(),file.getOriginalFilename(), id);
    }
}