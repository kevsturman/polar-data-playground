import pl from 'nodejs-polars';

const df = pl.readCSV('./data/kew/wcvp_names.csv',{ sep:'|'})

const columnsOfInterest = ['family','species','lifeform_description']

columnsOfInterest.forEach((col) => {
    const occur = df.groupBy([col]).agg(pl.count(col).alias('count')).sort('count', false);
    console.log(occur.sort("count",true).head(8));
});

// get rows where tree is present in lifeform_description
const tree = df.filter(pl.col('lifeform_description').str.contains('tree'));

// get the first 5 rows and specify the columns to display


console.log(tree.select(['family','species']).head(5))
