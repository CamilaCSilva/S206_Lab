package examples;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class S206TestRunner {
  
    @Test
    void testParallel() {
        Results results = Runner.path("classpath:aula_inatel")
                .tags("@makeup") // organiza os testes
                //.outputCucumberJson(true)
                .parallel(5);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }

}