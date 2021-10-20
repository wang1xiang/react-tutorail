import React, { useState } from 'react'

// 记录是否已挂载
let isMounted = false;
const PersonalInfoComponent = () => {
  let name, age, career, setName;

  console.log('isMounted is', isMounted);
  if (!isMounted) {
    // eslint-disable-next-line
    [name, setName] = useState('wx');
    // eslint-disable-next-line
    [age] = useState(18);

    isMounted = true;
  }
  [career] = useState('小前端，大智慧');

  console.log('career', career);

  return (
    <div className='personalInfo'>
      {name ? <p>姓名：{name}</p> : null}
      {age ? <p>年龄：{age}</p> : null} 
      <p>career: {career}</p>
      <button onClick={ () => setName('qwe') }>change</button>
    </div>
  )
}

export default PersonalInfoComponent
