const calculateEntropy = (data) => {
  const total = data.length;
  const count = data.reduce((acc, item) => {
    acc[item.IDPENYAKIT] = (acc[item.IDPENYAKIT] || 0) + 1;
    return acc;
  }, {});

  return Object.values(count).reduce((acc, n) => {
    const p = n / total;
    return acc - p * Math.log2(p);
  }, 0);
};

const splitData = (data, attribute) => {
  const splits = {};
  data.forEach(item => {
    // console.log('=========================================================')
    // console.log(item)
    const gejala = item.DAFTARGEJALA.find(gejala => gejala.IDGEJALA === attribute.IDGEJALA);
    const value = gejala ? gejala.VALUE : 0;

    if (!splits[value]) {
      splits[value] = [];
    }
    splits[value].push(item);
  });
  return splits;
};

const calculateGain = (data, attribute) => {
  const totalEntropy = calculateEntropy(data);
  const splits = splitData(data, attribute);
  const weightedEntropy = Object.values(splits).reduce((acc, subset) => {
    const subsetEntropy = calculateEntropy(subset);
    return acc + (subset.length / data.length) * subsetEntropy;
  }, 0);

  return totalEntropy - weightedEntropy;
};

const buildDecisionTree = (data, attributes) => {
  if (data.every(item => item.IDPENYAKIT === data[0].IDPENYAKIT)) {
    return { label: data[0].IDPENYAKIT };
  }

  if (attributes.length === 0) {
    const mostCommon = data.reduce((acc, item) => {
      acc[item.IDPENYAKIT] = (acc[item.IDPENYAKIT] || 0) + 1;
      return acc;
    }, {});
    const max = Object.keys(mostCommon).reduce((a, b) => mostCommon[a] > mostCommon[b] ? a : b);
    return { label: max };
  }

  const gains = attributes.map(attribute => calculateGain(data, attribute));
  const bestAttribute = attributes[gains.indexOf(Math.max(...gains))];

  const tree = { label: bestAttribute.IDGEJALA };
  const splits = splitData(data, bestAttribute);
  tree.children = Object.keys(splits).reduce((acc, value) => {
    acc[value] = buildDecisionTree(splits[value], attributes.filter(attr => attr !== bestAttribute));
    return acc;
  }, {});

  return tree;
};

const classify = (tree, diagnosis) => {
  console.log('Classify function called with:', { tree, diagnosis });
  if (!tree) {
    console.error('Tree is undefined');
    return "Unknown";
  }
  if (!tree.children) {
    return tree.label;
  }

  const symptom = diagnosis.DAFTARGEJALA.find(gejala => gejala.IDGEJALA === tree.label);
  if (symptom) {
    return classify(tree.children[symptom.VALUE], diagnosis);
  }

  return null;
};

module.exports = { buildDecisionTree, classify };