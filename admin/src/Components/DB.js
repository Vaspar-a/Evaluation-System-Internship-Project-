exports.getSubjects = (setLists, email) => {
  //console.log(email);
  fetch(`http://localhost:3000/subjects/${email}`)
    .then((res) => res.json())
    .then((data) => {
      let collegeList = [];
      let branchList = [];
      let semList = [];
      let subList = [];

      data.forEach((element) => {
        if (collegeList.indexOf(element.college) === -1)
          collegeList.push(element.college);
        if (branchList.indexOf(element.branch) === -1)
          branchList.push(element.branch);
        if (semList.indexOf(element.semester) === -1)
          semList.push(element.semester);
        if (subList.indexOf(`${element.subCode} | ${element.subName}`) === -1)
          subList.push(`${element.subCode} | ${element.subName}`);
      });

      //console.log(collegeList);
      //console.log(branchList);
      //console.log(semList);
      //console.log(subList);

      setLists(collegeList, branchList, semList, subList);

      // let result = [];

      // result.push(collegeList);
      // result.push(branchList);
      // result.push(semList);
      // result.push(subList);

      // return result;
    });
};

exports.processPedagogyData = (data) => {
  let dataArray = data.components.map((element, index) => {
    let result = [];
    result.push(index + 1);
    result.push(element.componentName);
    result.push(element.marks);
    result.push(element.weightage);

    return result;
  });

  return dataArray;
};

exports.getPedList = (pedData) => {
  let pedList = pedData.components.map((ele, index) => {
    return ele.componentName;
  });

  return pedList;
};

exports.getCompWeightage = (pedData) => {
  let weightageList = pedData.components.map((ele, index) => {
    return ele.weightage;
  });

  return weightageList;
};

exports.processEvaluateData = (stuData, pedData, evalData) => {
  const pedList = this.getPedList(pedData); // Get pedagogy components list

  // Final 2D array to be returned
  let result = stuData.details.map((ele, index) => {
    // Loop over stuData
    let result = []; // Insert 3 infos
    result.push(index + 1);
    result.push(ele._id);
    result.push(ele.sname);

    if (evalData !== null && evalData !== undefined) {
      // Find if stu in student is available in evaluate
      let student = evalData.marks.find((stu) => {
        return stu.sid === result[1];
      });
      // If student exists in evaluate
      if (student !== undefined) {
        // Loop over pedList to match the components
        pedList.forEach((compName) => {
          // Find if comp in pedagogy exists in evaluate
          let component = student.components.find((comp) => {
            return compName === comp.componentName;
          });
          // If component exists in evaluate then push its marks
          if (component !== undefined) result.push(component.marks);
          // If not then push 0
          else result.push(0);
        });
      } else {
        // If student doesn't exist in evaluate
        pedList.forEach((e) => {
          result.push(0); // Push 0s for all the components of pedagogy
        });
      }
    } else {
      // If evalData doesn't exists
      pedList.forEach((e) => {
        result.push(0); // Push 0s for all the components of pedagogy
      });
    }

    return result; // Return this 1D array result
  });

  return result; // Return this 2D array result
};

exports.processAdminData = (data) => {
  let dataArray = data.map((element, index) => {
    let singleArrayData = [];
    singleArrayData.push(index + 1);
    singleArrayData.push(element["name"]);
    singleArrayData.push(element["email"]);
    singleArrayData.push(element["subName"]);
    singleArrayData.push(element["subCode"]);
    singleArrayData.push(element["college"]);
    singleArrayData.push(element["branch"]);
    singleArrayData.push(element["semester"]);

    return singleArrayData;
  });

  return dataArray;
};

exports.processStudentData = (data) => {
  let dataArray = data.details.map((element, index) => {
    let result = [];
    result.push(index + 1);
    result.push(element._id);
    result.push(element.sname);

    return result;
  });

  return dataArray;
};

exports.processResultData = (stuData, pedData, evalData) => {
  const pedList = this.getPedList(pedData); // Get pedagogy components list

  // Final 2D array to be returned
  let result = stuData.details.map((ele, index) => {
    // Loop over stuData
    let result = []; // Insert 3 infos
    result.push(index + 1);
    result.push(ele._id);
    result.push(ele.sname);

    if (evalData !== null && evalData !== undefined) {
      // Find if stu in student is available in evaluate
      let student = evalData.marks.find((stu) => {
        return stu.sid === result[1];
      });
      // If student exists in evaluate
      if (student !== undefined) {
        // Loop over pedList to match the components
        pedList.forEach((compName) => {
          // Find if comp in pedagogy exists in evaluate
          let component = student.components.find((comp) => {
            return compName === comp.componentName;
          });
          // If component exists in evaluate then push its marks
          if (component !== undefined) result.push(component.marks);
          // If not then push 0
          else result.push(0);
        });
        result.push(student.totalMarks); // For totalMarks;
      } else {
        // If student doesn't exist in evaluate
        pedList.forEach((e) => {
          result.push(0); // Push 0s for all the components of pedagogy
        });
        result.push(0); // For totalMarks;
      }
    } else {
      // If evalData doesn't exists
      pedList.forEach((e) => {
        result.push(0); // Push 0s for all the components of pedagogy
      });
      result.push(0); // For totalMarks;
    }

    return result; // Return this 1D array result
  });

  return result; // Return this 2D array result
};

exports.getSubjectsForAdminResult = (endpoint, setSubject) => {
  fetch(`http://localhost:3000/admin/${endpoint}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      if (data !== null) {
        let subList = data.map((doc) => {
          return doc.subCode + " | " + doc.subName;
        });
        subList.push("All Subjects");
        setSubject(subList);
      } else {
        setSubject([]);
      }
    })
    .catch((err) => console.log(err));
};

exports.processAllSubjectResultData = (data) => {
  // Final 2D array to be returned
  const stuData = data[0];
  data = data.slice(1); // All subjects' marks data
  let theadData = [];

  if(stuData !== null && stuData !== undefined) {
    let tbodyData = stuData.details.map((ele, index) => {
      // Loop over stuData
      let result = []; // Insert 3 infos
      result.push(index + 1);
      result.push(ele._id);
      result.push(ele.sname);
  
      data.forEach((evalData, index) => {
  
        if (evalData !== null && evalData !== undefined) {
          // Find if stu in student is available in evaluate
          const student = evalData.marks.find((stu) => {
            return stu.sid === result[1];
          });
          // If student exists in evaluate
          if (student !== undefined) {
            // Loop over pedList to match the components
            result.push(student.totalMarks); // For totalMarks;
          } else {
            // If student doesn't exist in evaluate
            result.push(0); // For totalMarks;
          }
          const subData = evalData._id.split("_");
          if(theadData.indexOf(`${subData[3]} | ${subData[4]}`) === -1)
            theadData.push(`${subData[3]} | ${subData[4]}`);
         } //else {
        //   // If evalData doesn't exists
        //   result.push(null); // For totalMarks;
        // }
  
      });
  
      return result; // Return this 1D array result
    });

    return {theadData, tbodyData}; // Return this 2D array result
  }
  else
    return {theadData: [], tbodyData: []};
};

exports.getFetchStatements = (endpoints) => {
  let fetchStatementArray = endpoints.map((endpoint, index) => {
    return fetch(endpoint);
  });
  //console.log(fetchStatementArray);
  return fetchStatementArray;
};

exports.getFinalReport = (theoryData, practicalData) => {
  let result = theoryData.tbodyData.map((row, index) => {
    
  });

  return result;
}