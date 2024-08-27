import React, { useState, useEffect } from 'react';

//CSS
import style from './Clock.module.scss';

interface ClockProps {
  tempo: number | undefined;
}

const Clock = ({ tempo = 0 }: ClockProps) => {
  const [minutosDezena, setMinutosDezena] = useState<number>(0);
  const [minutosUnidade, setMinutosUnidade] = useState<number>(0);
  const [segundosDezena, setSegundosDezena] = useState<number>(0);
  const [segundosUnidade, setSegundosUnidade] = useState<number>(0);

  useEffect(() => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    setMinutosDezena(Math.floor(minutos / 10));
    setMinutosUnidade(minutos % 10);
    setSegundosDezena(Math.floor(segundos / 10));
    setSegundosUnidade(segundos % 10);
  }, [tempo]); 

  return (
    <>
      <span className={style.relogioNumero}>{minutosDezena}</span>
      <span className={style.relogioNumero}>{minutosUnidade}</span>
      <span className={style.relogioDivisao}>:</span>
      <span className={style.relogioNumero}>{segundosDezena}</span>
      <span className={style.relogioNumero}>{segundosUnidade}</span>
    </>
  );
}

export default Clock;
