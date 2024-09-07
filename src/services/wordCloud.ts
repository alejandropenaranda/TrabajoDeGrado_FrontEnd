import { API_URL } from "../auth/constants";
import { WordCloudResponse, WordCloudError }  from "../types/TeacherTypes"

export async function getWordCloud(token: string, id: number) {
    try{
      const res = await fetch(
        `${API_URL}/analizar_comentarios?docente_id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok){
        const json = (await res.json()) as WordCloudResponse
        return json

      }else{
        const json = (await res.json()) as WordCloudError
        return json
      }

    }catch (error) {
      console.log(error)
    }

  }