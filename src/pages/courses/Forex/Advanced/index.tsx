import { Card, Col, Row } from 'react-bootstrap';
import React, { Suspense } from 'react';
// hooks
import { usePageTitle } from '../../../../hooks';

import ReactPlayer from 'react-player'

const videos = [
    { url: 'https://vid.forexcellencenet.com/Advanced/Breakoutstrategy.mp4' , title: 'Breakoutstrategy' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Common%20Mistakes%20with%20Fibonacci%20Tools.mp4' , title: 'Common Mistakes With Fibonacci Tools' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Compare%20Supply%20and%20Demand%20with%20Support%20and%20resistance.mp4' , title: 'Compare Supply And Demand With Support And Resistance' },
    { url: 'https://vid.forexcellencenet.com/Advanced/compare%20Supply%20and%20Demand%20with%20Trendline.mp4' , title: 'Compare Supply And Demand With Trendline' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Corrective%20wave.mp4' , title: 'Corrective Wave' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Define%20strongest%20Supply%20Demand%20zone.mp4' , title: 'Define Strongest Supply Demand Zone' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fractal%20nature%20of%20Elliot%20waves.mp4' , title: 'Fractal Nature Of Elliot Waves' },
    { url: 'https://vid.forexcellencenet.com/Advanced/how%20to%20draw%20Supply%20and%20Demand%20zones%20with%20a%20base%20range.mp4' , title: 'How To Draw Supply And Demand Zones With A Base Range' },
    { url: 'https://vid.forexcellencenet.com/Advanced/how%20to%20draw%20Supply%20and%20Demand%20zones.mp4' , title: 'How To Draw Supply And Demand Zones' },
    { url: 'https://vid.forexcellencenet.com/Advanced/How%20to%20trade%20Elliot%20waves.mp4' , title: 'How To Trade Elliot Waves' },
    { url: 'https://vid.forexcellencenet.com/Advanced/how%20to%20trade%20Supply%20and%20Demand%20Zone.mp4' , title: 'How To Trade Supply And Demand Zone' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Impulse%20waves.mp4' , title: 'Impulse Waves' },
    { url: 'https://vid.forexcellencenet.com/Advanced/London%20trading%20strategy.mp4' , title: 'London Trading Strategy' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Risk%20Management%20Plan.mp4' , title: 'Risk Management Plan' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Rules%20and%20Tips%20for%20Using%20Elliott%20Waves.mp4' , title: 'Rules And Tips For Using Elliott Waves' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Supply%20and%20Demand-%20The%20Definition%20and%20how%20it%20works.mp4' , title: 'Supply And Demand- The Definition And How It Works' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Supply%20Demand%20Quiz%201.mp4' , title: 'Supply Demand Quiz 1' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Supply%20Demand%20Quiz%202.mp4' , title: 'Supply Demand Quiz 2' },
    { url: 'https://vid.forexcellencenet.com/Advanced/The%20right%20way%20to%20Draw%20Highs%20and%20Lows.mp4' , title: 'The Right Way To Draw Highs And Lows' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Trade%20Management%20Plan.mp4' , title: 'Trade Management Plan' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Types%20of%20supply%20and%20demand.mp4' , title: 'Types Of Supply And Demand' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Understanding%20Fibonacci%20Retracement.mp4' , title: 'Understanding Fibonacci Retracement' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Understanding%20Highs%20and%20Lows.mp4' , title: 'Understanding Highs And Lows' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Understanding%20Risk-Reward%20Ratio.mp4' , title: 'Understanding Risk-Reward Ratio' },
    { url: 'https://vid.forexcellencenet.com/Advanced/W%20&%20M%20pattern%20trading%20strategy.mp4' , title: 'W & M Pattern Trading Strategy' },
    { url: 'https://vid.forexcellencenet.com/Advanced/What%20is%20a%20strategy.mp4' , title: 'What Is A Strategy' },
    { url: 'https://vid.forexcellencenet.com/Advanced/What%20is%20an%20Elliot%20Wave.mp4' , title: 'What Is An Elliot Wave' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Introduction%20to%20Fibonacci%20Trading.mp4' , title: 'Introduction To Fibonacci Trading' },
    { url: 'https://vid.forexcellencenet.com/Advanced/History%20of%20Fibonacci%20Trading.mp4' , title: 'History Of Fibonacci Trading' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Daily%20Fibonacci%20Pivot%20trading.mp4' , title: 'Daily Fibonacci Pivot Trading' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fibonacci%20Retracement%20Strategy.mp4' , title: 'Fibonacci Retracement Strategy' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fibonacci%20+%20Confirmation%20Case%201.mp4' , title: 'Fibonacci + Confirmation Case 1' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fibonacci%20+%20Confirmation%20Case%202.mp4' , title: 'Fibonacci + Confirmation Case 2' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fibonacci%20Quiz%201.mp4' , title: 'Fibonacci Quiz 1' },
    { url: 'https://vid.forexcellencenet.com/Advanced/Fibonacci%20Quiz%202.mp4' , title: 'Fibonacci Quiz 2' },

];

const AdvancedCourse = () => {
    // set pagetitle
    usePageTitle({
        title: 'Advanced Forex Trading Master Course',
        breadCrumbItems: [
            {
                path: '/Forex Master Course/Advanced',
                label: 'Advanced Course',
            },
            {
                path: '/Forex Master Course/Advanced',
                label: 'Advanced Course',
                active: true,
            },
        ],
    });

    return (

        <Row>
            {videos.map((video, index) => (
                <Col key={index} className='d-inline-block justify-content-center text-left mx-auto' xl={10}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">{video.title}</h4>
                            <hr />
                            <div className="ratio ratio-16x9">
                                <Suspense fallback={<div>Loading Video...</div>}>
                                    <ReactPlayer
                                        url={video.url}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                        onContextMenu={(e: any) => e.preventDefault()}
                                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    />
                                </Suspense>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>


    );
};


export default AdvancedCourse;
