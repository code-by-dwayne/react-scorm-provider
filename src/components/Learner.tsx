import { useScorm } from '@/lib/ScormProvider';

import React from 'react';

const Learner: React.FC<any> = () => {
  const { learnerName } = useScorm();
  return (
    <section className="section">
        <h3>Learner Information Retreived from the mock API:</h3>
        <p>student_name: {learnerName}</p>
    </section>
  )
};

export default Learner;
