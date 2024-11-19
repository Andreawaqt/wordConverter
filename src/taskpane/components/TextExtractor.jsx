import React, { useEffect, useState } from 'react';

function TextExtractor() {
    const [textsBetweenNumbering, setTextsBetweenNumbering] = useState([]);

    useEffect(() => {
        Office.onReady((info) => {
            if (info.host === Office.HostType.Word) {
                console.log("Word está listo");
                extractTextBetweenNumbering();
            } else {
                console.error("Office.js no está en un contexto de Word");
            }
        });
    }, []);

    const extractTextBetweenNumbering = async () => {
        try {
            await Word.run(async (context) => {
                // Obtiene el cuerpo del documento
                const body = context.document.body;
                body.load("text");

                await context.sync();
                const fullText = body.text;
                console.log("Texto completo del documento:", fullText); // Verifica el texto

                // Expresión regular para capturar texto entre "i)", "j)", "k)"
                const regex = /\b[i-k]\)\s(.*?)(?=\b[a-z]\)\s|$)/gs;
                let match;
                const texts = [];

                // Captura el texto entre numeraciones
                while ((match = regex.exec(fullText)) !== null) {
                    console.log("Texto capturado:", match[1]); // Verifica cada texto capturado
                    texts.push(match[1].trim());
                }

                // Actualiza el estado
                setTextsBetweenNumbering(texts);
                console.log("Textos entre numeraciones:", texts); // Verifica el estado antes de renderizar
            });
        } catch (error) {
            console.error("Error al capturar el texto entre numeraciones:", error);
        }
    };

    return (
        <div className="TextExtractor">
            <h1>Texto entre Elementos de Numeración</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Texto Capturado</th>
                    </tr>
                </thead>
                <tbody>
                    {textsBetweenNumbering.map((text, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TextExtractor;
