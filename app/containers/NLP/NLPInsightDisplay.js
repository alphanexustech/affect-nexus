import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Panel } from 'react-bootstrap';

import WordFrequencyScatterPlot from '../../components/subcharts/WordFrequencyScatterPlot'
import WordFrequencyPieChart from '../../components/subcharts/WordFrequencyPieChart'

import AffectExactRowTableGroup from '../../components/groups/AffectExactRowTableGroup'
import AffectStemmedRowTableGroup from '../../components/groups/AffectStemmedRowTableGroup'
import AffectLemmatizedRowTableGroup from '../../components/groups/AffectLemmatizedRowTableGroup'
import AffectCorpusLengthRowTableGroup from '../../components/groups/AffectCorpusLengthRowTableGroup'
import AffectNormalizedScoreRowTableGroup from '../../components/groups/AffectNormalizedScoreRowTableGroup'

import NLPDetailFreqDistTableModule from '../../components/tables/NLPDetailFreqDistTableModule'

import NLPNLTKPOSTable from '../../components/tables/NLPNLTKPOSTable'

class NLPInsightDisplay extends Component {
  render () {
    const { } = this.props;
    let emptyLocal = false, // Assume localStorage isn't empty
        emotion,
        emotionName,
        lastEmotionCreationDate,
        lastEmotionText;
        
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (localStorage.getItem('lastEmotion')) {
      emotion = JSON.parse(localStorage.getItem('lastEmotion'));
      emotionName = capitalizeFirstLetter(emotion.emotion);
      lastEmotionCreationDate = localStorage.getItem('lastEmotionCreationDate');
      lastEmotionText = localStorage.getItem('lastEmotionText');
    } else {
      // There isn't anything in localStorage. We assumed wrong.
      emptyLocal = true
    }

    return (
      <div>
        { emptyLocal &&
          <div style={{paddingBottom: '100px'}}>
            <Link className="pull-right btn btn-xs btn-primary" to="/process">
              <i className="fa fa-angle-double-left" aria-hidden="true"></i> Run a process
            </Link>
            <h3><i className="fa fa-bolt" aria-hidden="true"></i> Insight</h3>
            <p>
              View something insightful
            </p>
            <h6>
              The page will visualize the emotional aspects of an insight from a process you run.
              Right now it's empty and there isn't anything to show.
              Why don't you experiement a little and run a process.</h6>
          </div>
        }
        { !emptyLocal &&
          <div>
            <div className="transparent--module transparent--module_alt-01 transparent--module_module-3">
              <div className="transparent--module_module-content">
                <NLPNLTKPOSTable/>
              </div>
              <div className="transparent--module_module-icon">
                <i className="fa fa-2x fa-key" aria-hidden="true"></i>
              </div>
            </div>

            <Link className="pull-right btn btn-xs btn-primary" to="/process">
              <i className="fa fa-angle-double-left" aria-hidden="true"></i> Run another process
            </Link>
            <div style={{paddingBottom: '100px'}}>
              <h3><i className="fa fa-bolt" aria-hidden="true"></i> Insight</h3>
              <p>
                View something insightful
              </p>
              <h6>
                The page visualizes the emotional aspects of the last insight you found from a process you ran.
                It’s only from the perspective of {emotionName},
                but hopefully you’ll have an insightful discovery process.
                It’s all based around the words you processed.</h6>
              <div style={{
                  fontSize: '10px',
                  marginTop: '32px'
                }}>
                Last updated on {lastEmotionCreationDate}.
              </div>
              <Row>
                <Col sm={12} md={12} lg={4}>
                  <div className="insight--emotion_set-title insight--display_rank">
                    <div className="insight--display_rank-sub_heading">{emotionName}</div>
                  </div>
                  <div className="insight--display_scores insight--display_main-area-wrapper">
                    <div className="insight--display_scores-main_heading">{emotion.normalized_r_score.toFixed(4)}</div>
                    <div className="insight--display_scores-sub_heading">
                      <i className="fa fa-star affect--emotion_fa-icon-adjustment" aria-hidden="true"></i> Normalized Score
                    </div>
                  </div>
                  <WordFrequencyPieChart emotionName={emotionName}></WordFrequencyPieChart>
                </Col>
                <Col sm={12} md={12} lg={8} style={{paddingTop: '20px'}}>
                  <WordFrequencyScatterPlot emotionName={emotionName}></WordFrequencyScatterPlot>
                  <NLPDetailFreqDistTableModule></NLPDetailFreqDistTableModule>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <Col lg={12}>
                  <div className="insight--emotion_set-title insight--emotion_set-title_table">
                      <Table condensed style={{
                          fontSize: '12px',
                          marginLeft: '5%',
                          textAlign: 'left',
                          width: '95%',
                          tableLayout: 'fixed',
                        }}>
                        <thead>
                          <tr>
                            <th></th>
                            <th>I Words</th>
                            <th>II Words</th>
                            <th>III Words</th>
                            <th>I-II Words</th>
                            <th>I-III Words</th>
                            <th>II-III Words</th>
                            <th>I-II-III Words</th>
                          </tr>
                        </thead>
                      </Table>
                  </div>
                  <div className="insight--display_main-area-wrapper">
                    <div className="insight--display_main-area">
                      <Table condensed style={{
                          fontSize: '12px',
                          marginLeft: '5%',
                          textAlign: 'left',
                          width: '95%',
                          tableLayout: 'fixed',
                          marginBottom: '0px',
                        }}>
                        <tbody>
                          <AffectExactRowTableGroup data={emotion} limitList={0}></AffectExactRowTableGroup>
                          <AffectStemmedRowTableGroup data={emotion} limitList={0}></AffectStemmedRowTableGroup>
                          <AffectLemmatizedRowTableGroup data={emotion} limitList={0}></AffectLemmatizedRowTableGroup>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="insight--emotion_set-footer insight--emotion_set-footer_table">
                      <Table condensed style={{
                          fontSize: '12px',
                          marginLeft: '5%',
                          textAlign: 'left',
                          width: '95%',
                          tableLayout: 'fixed',
                        }}>
                        <tbody>
                          <AffectCorpusLengthRowTableGroup data={emotion}></AffectCorpusLengthRowTableGroup>
                          <AffectNormalizedScoreRowTableGroup data={emotion}></AffectNormalizedScoreRowTableGroup>
                        </tbody>
                      </Table>
                  </div>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                {lastEmotionText.length > 0 &&
                  <Col lg={6}>
                    <div className="insight--emotion_set-title">
                      Text used to generate this Insight
                    </div>
                    <div className="insight--display_description-area-wrapper">
                      <div className="insight--display_description-area">
                        <div className="insight--display_description">
                        {lastEmotionText}
                        </div>
                      </div>
                    </div>
                  </Col>
                }
                <Col lg={6}>
                  <div className="insight--emotion_set-title">
                    Methodology
                  </div>
                  <div className="insight--display_description-area-wrapper">
                    <div className="insight--display_description-area">
                      <div className="insight--display_description">
                        When you think of a word, it really only represents an idea.
                        Emotion words are no different because emotion words are not the actual feeling (or mixture of feelings).
                        {emotionName} the word is not the emotion you might try to describe by using the word.
                        The word, {emotionName}, is calculated and scored based on the process you ran.
                        That process takes the words you decided to include, and separates those words from the entire selection.
                        Those words are then compared after being put into groups.
                      </div>
                      <div className="insight--display_description">
                        The process found that <i>'I Words'</i> are synonyms of {emotionName},
                        the <i>'II Words'</i> are synonyms of those synonyms,
                        and the <i>'III Words'</i> are synonyms of those.
                        The process stops after finding the third set of synonyms because otherwise it would get even more complex!
                        The normalized score is calculated by considering the total length of the group which relates to the synonym (the type of synonym matters, too).
                        Smaller groups with any synonyms receive more points.
                        A point is given for every synonym and weighted based on which group(s) the synonym is in.
                        Each group receives its normalized score and they are combined to create the overall normalized score for the emotion word called {emotionName}.
                      </div>
                      <div className="insight--display_description">
                        <i>'I-II Words'</i> are synonyms that exist in both the <i>'I Words'</i> and <i>'II Words'</i> groups.
                        Similarly, <i>'II-III Words'</i>, <i>'II-III Words'</i>,
                        and <i>'I-II--III Words'</i> are groups where a synonym exists in the respective union of groups.
                      </div>
                      <div className="insight--display_description">
                        An emotion word, like {emotionName},
                        is the cultural lens the process uses to learn more about an emotion.
                        With a set of emotion words,
                        the process allows you to infer the emotional quality about a particular selection of text.
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default NLPInsightDisplay;
