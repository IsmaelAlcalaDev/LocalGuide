package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.GuideRepository;
import com.ismael.localguide.application.repository.repository.HobbiesRepository;
import com.ismael.localguide.application.repository.repository.LanguageRepository;
import com.ismael.localguide.application.repository.repository.ReservationRepository;
import com.ismael.localguide.domain.Gender;
import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.Hobbies;
import com.ismael.localguide.domain.Language;
import com.ismael.localguide.domain.dto.GuideInformationDTO;
import com.ismael.localguide.domain.dto.TopRatedGuidesDTO;
import com.sun.tools.jconsole.JConsoleContext;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class GuideUseCase {

    @Autowired
    private GuideRepository guideRepository;
    @Autowired
    private LanguageRepository languageRepository;
    @Autowired
    private HobbiesRepository hobbiesRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    public Optional<Guide> findByEmail(final String email){
        try{
            return this.guideRepository.findByEmail(email);
        }catch (Exception e){
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public Guide login(final String email, final String password) {
        try {
            Guide guide = this.guideRepository.findByEmailAndPassword(email, password);
            if (guide != null) {
                List<String> listLanguages = this.languageRepository.findLanguagesByGuideId(guide.getId());
                List<String> listHobbies = this.hobbiesRepository.findHobbiesByGuideId(guide.getId());

                Set<Language> languages = new HashSet<>();
                Set<Hobbies> hobbies = new HashSet<>();

                for (String language : listLanguages) {
                    Language lang = new Language();
                    lang.setLanguage(language);
                    languages.add(lang);
                }

                for (String hobby : listHobbies) {
                    Hobbies hob = new Hobbies();
                    hob.setName(hobby);
                    hobbies.add(hob);
                }

                guide.setLanguages(languages);
                guide.setHobbies(hobbies);
            }

            return guide;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Guide save(Guide guide){ return this.guideRepository.save(guide);}

    public Optional<Guide> findById(Long id){
        return this.guideRepository.findById(id);
    }

    public List<Guide> findAll(){
        return this.guideRepository.findAll();
    }

    public Optional<Guide> updateGuide(Long id, Map<String, Object> updatesRequest) {
        System.out.println(updatesRequest);
        Optional<Guide> guideOptional = this.guideRepository.findById(id);
        if (!guideOptional.isPresent()) {
            return Optional.empty();
        }
        guideOptional.ifPresent(guide -> {
            for (Map.Entry<String, Object> entry : updatesRequest.entrySet()) {
                final String fieldName = entry.getKey();
                final Object value = entry.getValue();
                switch (fieldName) {
                    case "name":
                        guide.setName(value.toString());
                        break;
                    case "surname":
                        guide.setSurname(value.toString());
                        break;
                    case "country":
                        guide.setCountry(value.toString());
                        break;
                    case "city":
                        guide.setCity(value.toString());
                        break;
                    case "gender":
                        try {
                            Gender gender = Gender.valueOf(value.toString());
                            guide.setGender(gender);
                        } catch (IllegalArgumentException e) {
                            e.printStackTrace();
                        }
                        break;
                    case "phone":
                        guide.setPhone(value.toString());
                        break;
                    case "email":
                        guide.setEmail(value.toString());
                        break;
                    case "password":
                        guide.setPassword(value.toString());
                        break;
                    case "hourlyPrice":
                        try {
                            guide.setHourlyPrice(Integer.parseInt(value.toString()));
                        } catch (NumberFormatException e) {
                            e.printStackTrace();
                        }
                        break;
                    case "additionalInfo":
                        guide.setAdditionalInfo(value.toString());
                        break;
                    case "phrase":
                        guide.setPhrase(value.toString());
                        break;
                    case "languages":
                        guide.getLanguages().clear();
                        Set<Language> languages = new HashSet<>();
                        for (String languageName : (List<String>) value) {
                            Language language = languageRepository.findByLanguage(languageName);
                            if (language == null) {
                                continue;
                            }
                            languages.add(language);
                        }
                        System.out.println(languages);
                        guide.setLanguages(languages);
                        break;
                    case "hobbies":
                        guide.getHobbies().clear();
                        Set<Hobbies> hobbies = new HashSet<>();
                        for (String hobbyName : (List<String>) value) {
                            Hobbies hobby = hobbiesRepository.findByName(hobbyName);
                            if (hobby == null) {
                                continue;
                            }
                            hobbies.add(hobby);
                        }
                        guide.setHobbies(hobbies);
                        break;
                    case "identityDocument":
                        guide.setIdentityDocument((Boolean) value);
                        break;
                    case "backgroundCheckCertificate":
                        guide.setBackgroundCheckCertificate((Boolean) value);
                        break;
                    case "profileImg":
                        guide.setProfileImg(value.toString());
                        break;
                    default:
                        break;
                }
            }

        });
        Optional<Guide> guideOptionalFinal = this.guideRepository.findById(id);
        if (!guideOptionalFinal.isPresent()) {
            return Optional.empty();
        }
        guideRepository.save(guideOptionalFinal.get());
        return guideOptionalFinal;
    }

    public List<TopRatedGuidesDTO> getTopRatedGuides() {
        List<Guide> guides = guideRepository.findAllByReservationWithHighReviewScore();
        return guides.stream()
                .map(this::mapToTopRatedGuidesDTO)
                .collect(Collectors.toList());
    }

    private TopRatedGuidesDTO mapToTopRatedGuidesDTO(Guide guide) {
        double averageScore = reservationRepository.getAverageReviewScoreByGuideIdAndStatusAcceptedAndNotDeleted(guide.getId());
        int totalReservations = reservationRepository.countReservationsByGuideIdAndStatusAcceptedAndNotDeleted(guide.getId());
        return new TopRatedGuidesDTO(
                guide.getId(),
                guide.getName(),
                guide.getCountry(),
                guide.getCity(),
                guide.getProfileImg(),
                guide.getPhrase(),
                guide.getHourlyPrice(),
                totalReservations,
                (int) averageScore
        );
    }

    public GuideInformationDTO getGuideDetails(long idGuide) {
        Guide guide = guideRepository.findById(idGuide).orElse(null);
        if (guide == null) {
            return null;
        }

        List<String> listLanguages = languageRepository.findLanguagesByGuideId(idGuide);
        List<String> listHobbies = hobbiesRepository.findHobbiesByGuideId(idGuide);

        GuideInformationDTO guideInformationDTO = new GuideInformationDTO();
        guideInformationDTO.setId(guide.getId());
        guideInformationDTO.setName(guide.getName());
        guideInformationDTO.setSurname(guide.getSurname());
        guideInformationDTO.setCountry(guide.getCountry());
        guideInformationDTO.setCity(guide.getCity());
        guideInformationDTO.setGender(guide.getGender());
        guideInformationDTO.setPhone(guide.getPhone());
        guideInformationDTO.setProfileImg(guide.getProfileImg());
        guideInformationDTO.setEmail(guide.getEmail());
        guideInformationDTO.setBackgroundCheckCertificate(guide.getBackgroundCheckCertificate());
        guideInformationDTO.setIdentityDocument(guide.getIdentityDocument());
        guideInformationDTO.setHourlyPrice(guide.getHourlyPrice());
        guideInformationDTO.setAdditionalInfo(guide.getAdditionalInfo());
        guideInformationDTO.setPhrase(guide.getPhrase());
        guideInformationDTO.setTypeUser(guide.getTypeUser());
        guideInformationDTO.setLanguages(new HashSet<>(listLanguages));
        guideInformationDTO.setHobbies(new HashSet<>(listHobbies));

        return guideInformationDTO;
    }

    public List<Guide> searchGuideFilter(
            String guideName,
            String country,
            String city,
            List<String> languages,
            List<String> hobbies,
            Integer priceMin,
            Integer priceMax,
            Gender gender) {
        System.out.println("precio minimo: " + priceMin);
        System.out.println("precio maximo: " + priceMax);
        return guideRepository.searchGuideFilter(guideName, country, city, languages, hobbies, priceMin,priceMax, gender);
    }

    public int calculateTotalReservations(Guide guide) {
        return reservationRepository.countReservationsByGuideIdAndStatusAcceptedAndNotDeleted(guide.getId());
    }

    public double calculateAverageScore(Guide guide) {
        Double averageScore = reservationRepository.getAverageReviewScoreByGuideIdAndStatusAcceptedAndNotDeleted(guide.getId());
        return (averageScore != null) ? averageScore : 0;
    }
}
