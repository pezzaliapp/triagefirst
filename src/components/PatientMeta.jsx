const SEX_VALUES = ['', 'male', 'female', 'other']

export function PatientMeta({ age, sex, pregnant, onChange, labels }) {
  const showPregnant = sex === 'female' || sex === ''

  return (
    <div className="meta-row">
      <div className="meta-card">
        <label>{labels.ageLabel}</label>
        <input
          type="number"
          min="0"
          max="120"
          placeholder={labels.agePlaceholder}
          value={age}
          onChange={(e) => onChange('age', e.target.value)}
        />
      </div>

      <div className="meta-card">
        <label>{labels.sexLabel}</label>
        <select
          value={sex}
          onChange={(e) => {
            const val = e.target.value
            onChange('sex', val)
            if (val !== 'female') onChange('pregnant', 'no')
          }}
        >
          {labels.sexOptions.map((opt, i) => (
            <option key={i} value={SEX_VALUES[i]}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {showPregnant && (
        <div className="meta-card">
          <label>{labels.pregnantLabel}</label>
          <select
            value={pregnant}
            onChange={(e) => onChange('pregnant', e.target.value)}
          >
            {labels.pregOptions.map((opt, i) => (
              <option key={i} value={['no', 'yes', 'unknown'][i]}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
