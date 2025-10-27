package pokemon;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;

public class RunnerPokemon {

    @Test
    void testPokemon(){
        String tags = System.getProperty("karate.tags");
        Results results = Runner.path("classpath:pokemon/pokemon.feature")
                .tags(tags)
                .parallel(1);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
    
}
