import React, { Component } from 'react';
import './SearchingLoading.css';

export default class SearchLoading extends Component {
  render() {
    return (
      <div className="boxes-container">
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
        <div className="skeleton box" />
      </div>
    );
  }
}
