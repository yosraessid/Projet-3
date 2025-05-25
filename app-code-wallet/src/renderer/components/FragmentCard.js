import React from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import { Visibility, Info } from '@mui/icons-material';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const FragmentCard = ({ fragment, onEdit, onInfo }) => {
  const { title, code, tags } = fragment;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <div className="code-block">
          <pre>
            <code className="language-javascript">
              {hljs.highlight(code, { language: 'javascript' }).value}
            </code>
          </pre>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <div>
            {tags.map((tag, index) => (
              <span key={index} style={{
                backgroundColor: '#e3f2fd',
                padding: '4px 8px',
                borderRadius: '4px',
                marginRight: '4px',
                fontSize: '0.875rem'
              }}>
                {tag}
              </span>
            ))}
          </div>
          <div>
            <Tooltip title="View Code">
              <IconButton onClick={() => onEdit(fragment)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Info">
              <IconButton onClick={() => onInfo(fragment)}>
                <Info />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FragmentCard;
