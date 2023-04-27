import axios from "axios";
import { Diary } from "../App";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const baseUrl = 'http://localhost:3001/api/diaries'

async function getAll() {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

async function create(obj: Diary, setError: any) {
  try {
    const response = await axios.post(baseUrl, obj)
    return response.data
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response !== undefined) {
      console.error(error.response)
      setError(error.response.data)
    } else {
      console.error(error);
    }
  }
}

const diaryService = {
  getAll,
  create
}

export default diaryService
