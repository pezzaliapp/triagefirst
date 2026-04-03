import { useState, useCallback } from 'react'

const STORAGE_KEY = 'tf_history'
const MAX_ENTRIES = 10

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function useTriageHistory() {
  const [history, setHistory] = useState(loadHistory)

  const addEntry = useCallback((result, symptoms) => {
    const entry = {
      id: Date.now(),
      level: result.level,
      title: result.title,
      symptoms: symptoms.substring(0, 80),
      ts: Date.now(),
    }
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }, [])

  return { history, addEntry, clearHistory }
}
