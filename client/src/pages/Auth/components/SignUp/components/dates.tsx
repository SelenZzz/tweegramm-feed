import { monthNames } from '../../../../../utils/months';

export const daysList = (month: number, year: number) => {
  const days = new Date(year, month, 0).getDate();
  const list = [];
  list.push(<option key="-1" value=" " disabled hidden></option>);
  for (let i = 1; i <= days; i++)
    list.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  return list;
};

export const yearList = () => {
  const to = new Date().getFullYear();
  const from = to - 100;
  const list = [];
  list.push(<option key="-1" value=" " disabled hidden></option>);
  for (let i = to; i >= from; i--)
    list.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  return list;
};

export const monthList = () => {
  const list = [];
  list.push(<option key="-1" value=" " disabled hidden></option>);
  monthNames.map((e) => {
    list.push(
      <option key={e} value={e}>
        {e}
      </option>,
    );
  });
  return list;
};
