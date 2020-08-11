export const getProblemList = () => {
  return fetch("http://localhost:8000/problems")
  .then((res) => res.json());
};

export const postUserSolution = (problemId, code) => {
  return fetch(`http://localhost:8000/problems/${problemId}`,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({code})
  }).then(res => res.json());
};