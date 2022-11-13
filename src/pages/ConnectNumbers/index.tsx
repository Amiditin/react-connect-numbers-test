import React from 'react';
import styles from './ConnectNumbers.module.scss';
import clsx from 'clsx';

import { useWindowSize } from '../../hooks';

import { Test } from './Test';
import { Form } from './Form';
import { Button, Stopwatch } from '../../components';

import { IConnectNumbersForm, IPostData, TestStatus } from './types';

import { connectNumbersTests } from '../../utils/constants';
import { SubmitHandler } from 'react-hook-form';

export const ConnectNumbers: React.FC = () => {
  const [tests, setTests] = React.useState(connectNumbersTests);
  const [testStatus, setTestStatus] = React.useState<TestStatus>('pending');
  const [matrixWidth, setMatrixWidth] = React.useState(0);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  React.useEffect(() => {
    if (boxRef.current) {
      setMatrixWidth(boxRef.current.clientWidth);
    }
  }, [size.width]);

  const handleClickStart = () => {
    setTestStatus('started');
  };

  const handleTestFinish = (time: number) => {
    const completedTest = tests.find((test) => !test.completed);

    if (!completedTest) {
      return;
    }

    setTests(
      tests.map((test) =>
        test.number === completedTest.number ? { ...completedTest, completed: true, time } : test,
      ),
    );
  };

  const getStopwatchStatus = () => {
    if (testStatus === 'pending') {
      return 'paused';
    }
    if (testStatus === 'started') {
      return 'started';
    }

    return 'stopped';
  };

  const onSubmitResults: SubmitHandler<IConnectNumbersForm> = (data) => {
    const postData: IPostData = {
      name: data.name,
      age: +data.age,
      email: data.email,
      phone: Number('7' + data.phone),
      results: tests.map((test) => ({ number: test.number, time: test.time })),
    };

    console.log('Данные для бека:', postData);
    console.log('JSON:', JSON.stringify(postData));

    //TODO: оправка ан бэк
  };

  return (
    <section className={styles.connectNumbers}>
      <div className={styles.info}>
        <h1 className={styles.title}>Тест «Соедини&nbsp;числа»</h1>
        <h3 className={styles.subtitle}>
          Психодиагностическая процедура для количественного выявления (латентной) портосистемной
          энцефалопатии.
        </h3>
      </div>

      <Form onSubmit={onSubmitResults}>
        <div className={styles.box} ref={boxRef}>
          <div className={styles.top}>
            <ul className={styles.tabs}>
              {tests.map((test) => (
                <li
                  className={clsx(
                    styles.tab,
                    test.completed && styles.tabCompleted,
                    tests.find((test) => !test.completed)?.number === test.number &&
                      styles.tabCurrent,
                  )}
                  key={test.number}>
                  Тест {test.number}
                </li>
              ))}
            </ul>
            <span className={styles.timer}>
              Время:
              <Stopwatch interval={100} status={getStopwatchStatus()} getTime={handleTestFinish} />
              сек.
            </span>
          </div>

          <Test
            matrixWidth={matrixWidth}
            setTests={setTests}
            setTestStatus={setTestStatus}
            test={tests.find((test) => test.completed === false) || tests[0]}
            testStatus={testStatus}
          />

          {tests.find((test) => !test.completed) ? (
            <Button
              className={clsx(styles.startButton, testStatus !== 'started' && styles.displayed)}
              type="button"
              onClick={handleClickStart}>
              Начать тест {tests.find((test) => test.completed === false)?.number}
            </Button>
          ) : (
            <Button
              className={clsx(styles.submitButton, testStatus !== 'started' && styles.displayed)}
              type="submit">
              Отправить результаты
            </Button>
          )}

          <ul className={clsx(styles.results, testStatus !== 'started' && styles.displayed)}>
            {tests.map(
              (test) =>
                test.completed && (
                  <li className={styles.result} key={test.number}>
                    <span>Тест {test.number}.</span>
                    <span>Время: {test.time} сек.</span>
                  </li>
                ),
            )}
          </ul>
        </div>
      </Form>
    </section>
  );
};
