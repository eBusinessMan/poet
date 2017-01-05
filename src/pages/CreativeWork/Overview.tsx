import * as React from "react";
import { connect } from "react-redux";

import './style.scss';

export interface OverviewProps {
  title: string;
  author: string;
  published: Date;
  lastModified: Date;
  customLabel: string;
  tags: string[];
  type: string;
}

function overviewView(props: OverviewProps) {
  const tableData = new Map();
  tableData.set('Author', props.author);
  tableData.set('Published', props.published);
  tableData.set('Last Modified', props.lastModified);
  tableData.set('Custom Label', props.customLabel);
  tableData.set('Tags', props.tags);
  tableData.set('Type', props.type);

  return (
    <div className="overview">
      <h1>{props.title}</h1>
      <table>
        <colgroup>
          <col className="keys"/>
          <col className="values"/>
        </colgroup>
        <tbody>
        {
          [...tableData.keys()].map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{tableData.get(key).toString()}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

function mapStateToProps(state: any) {
  return ({
    title: 'Distributed: Markets Event To Convene Blockchain Payments, FinServices Innovator in Atlanta',
    author: 'Satoshi',
    published: new Date(),
    lastModified: new Date(),
    customLabel: 'Label',
    tags: ['asdf', 'asdf'],
    type: 'Article',
  });
}

export default connect(mapStateToProps)(overviewView)