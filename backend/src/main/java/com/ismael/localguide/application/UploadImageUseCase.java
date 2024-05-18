package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.GuideRepository;
import com.ismael.localguide.domain.Guide;
import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;


@AllArgsConstructor
@Service
public class UploadImageUseCase {

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private GuideUseCase guideUseCase;

    private final String UPLOAD_DIR = "e:/";

    public void uploadImage(final InputStream inputStream, final String name, final Long id) {
        try {
            byte[] bytes = IOUtils.toByteArray(inputStream);
            Path path = Paths.get(UPLOAD_DIR + "/" + UUID.randomUUID() + "_" + name);
            Files.write(path,bytes);
            Optional<Guide> guideOptional = this.guideRepository.findById(id);
            guideOptional.ifPresent(guide -> guide.setProfileImg(path.toString()));
            this.guideRepository.save(guideOptional.get());

/*
            Map<String,Object> imageUpdate = new HashMap<>();
            imageUpdate.put("imageUrl",path);
            guideOptional.ifPresent(this.guideUseCase.partialUpdate(id,imageUpdate));

 */
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
