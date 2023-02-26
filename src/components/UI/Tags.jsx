import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const Tags = ({ tags, filter, handleTag, posts }) => {
  const [allTags, setAllTags] = React.useState([]);

  React.useEffect(() => {
    let array = [];
    for (let el of posts?.items) {
      array.push(el.tags);
    }
    const uniqueArr = array
      .flat(Infinity)
      .map((arr) => {
        return { count: 1, name: arr };
      })
      .reduce((a, b) => {
        a[b.name] = (a[b.name] || 0) + b.count;
        return a;
      }, {});
    setAllTags(uniqueArr);
  }, []);
  return (
    <div className="w-full mb-5 md:w-1/2 lg:w-full">
      <ul>
        {Object.entries(allTags).map((tag) => (
          <li
            key={uuidv4()}
            onClick={() => handleTag({ ...filter, filter: tag[0] })}
            className="dark:border-transparent dark:hover:border-gray-200 px-1 py-4 border-y border-white hover:border-gray-200 transition-all duration-300"
          >
            <Link className="flex items-center dark:text-slate-400 text-gray-600">
              <span className="inline-block w-4 h-4 mr-3"></span>
              {tag[0]}
              <span className="text-gray-500 dark:text-slate-400 ml-auto">{tag[1]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
