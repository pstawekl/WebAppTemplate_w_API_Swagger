import React from "react";
import './styles/object.css'

export default function HomeSite() {
    return(
        <div className="body">
            <div className="banner">
                <h1>Projekt na zaliczenie semestru</h1>
                <br />
                <p className="bodyText">
                    <h3>Ten projekt został utworzony przez Jakuba Stawskiego, studenta I roku inż. Informatyki w trybie niestacjonarnym z wykorzystaniem metod nauki online. </h3><br />
                    <br />
                    Projekt aplikacji został opracowany na 3 warstwach. Jego struktura składa się z:
                    <ul>
                        <li>API - wykonane w technologi FastApi,</li>
                        <li>Backend'u - wykonanego w technologi Python,</li>
                        <li>Frontend'u - wykonanego w technologi React.js</li>
                    </ul>

                    Opis projektu:  <br />
                    Projekt ma za zadanie komunikację z bazą danych utworzoną w pliku config.json, API opracowane w technologii FastApi oraz zaprogramowane w jęzku Python oraz wyświetlanie informacji końcowych dla użytkownika w aplikacji internetowej utworzonej w technologii React.js <br />
                    Aplikacja internetowa pozwala nam na zarządzanie bazą danych poprzez edytowanie aktualnie znajdujących się w niej obiektów, usuwanie ich oraz tworzenie w niej nowych obiektów. <br />
                    Została zaprojektowana z myślą o użyciu na małych komputerach produkcyjnych firmy Moxa co wymusiło rozsądne zarządzanie pamięcią, ponieważ komputery Moxa mają małą ilość pamięci zarówno operacyjnej jak i pamięci masowej. 
                    Takie okoliczności spowodwały wybór pliku JSON i zaadaptowanie go jako bazy danych. <br />
                    Aplikacja internetowa wysyła zapytanie do API za pomocą technologi fetch. 
                </p>
            </div>
        </div>
    )
}